
   const fs = require('fs');
   const fsp = fs.promises;
   const path = require('path');
   const os = require('os');
   const crypto = require('crypto');
   const { pipeline } = require('stream');
   const { promisify } = require('util');
   const pump = promisify(pipeline);
   const readline = require('readline');
   
   function parseArgs(argv) {
     const args = { _: [] };
     for (let i = 0; i < argv.length; i++) {
       const a = argv[i];
       if (!a) continue;
       if (a.startsWith('--')) {
         const eq = a.indexOf('=');
         if (eq !== -1) {
           const key = a.slice(2, eq);
           args[key] = a.slice(eq + 1);
         } else {
           const key = a.slice(2);
           // boolean or next value
           const next = argv[i + 1];
           if (!next || next.startsWith('-')) args[key] = true;
           else { args[key] = next; i++; }
         }
       } else if (a.startsWith('-')) {
         const key = a.slice(1);
         const next = argv[i + 1];
         if (!next || next.startsWith('-')) args[key] = true;
         else { args[key] = next; i++; }
       } else args._.push(a);
     }
     return args;
   }
   
   function help() {
     console.log(`Pure Node.js — Advanced File CLI
   
   Usage:
     node advanced-file-cli.js <command> [args] [--options]
   
   Commands:
     help                         Show this message
     create <file> --content txt  Create a file (creates dirs)
     read <file> [--lines N]      Read a file (streamed)
     append <file> --content txt  Append to a file
     delete <path>                Delete file
     copy <src> <dest>            Copy via streams (shows progress)
     move <src> <dest>            Move/rename a file
     list <dir> [--recursive]     List directory contents
     stat <path>                  Show file stats
     find <dir> --pattern regex   Find files by name (RegExp)
     replace <file> --from a --to b  Replace text in file (in-place)
     hash <file> [--algo sha256]  Stream-file hash
   
   Interactive:
     Run without arguments to enter an interactive prompt.
   
   Examples:
     node advanced-file-cli.js create notes/todo.txt --content "Buy milk"
     node advanced-file-cli.js read notes/todo.txt
     node advanced-file-cli.js copy big.file backup/big.file
   `);
   }
   
   async function ensureDirFor(filePath) {
     const dir = path.dirname(filePath);
     if (dir === '.' || dir === '' ) return;
     await fsp.mkdir(dir, { recursive: true });
   }
   
   async function cmdCreate(file, opts) {
     await ensureDirFor(file);
     const content = opts.content || '';
     await fsp.writeFile(file, content, 'utf8');
     console.log('Created', file);
   }
   
   async function cmdRead(file, opts) {
     if (!fs.existsSync(file)) { console.error('Not found:', file); return; }
     const linesLimit = opts.lines ? Number(opts.lines) : null;
     if (!linesLimit) {
       const rs = fs.createReadStream(file, { encoding: 'utf8' });
       rs.pipe(process.stdout);
       await new Promise(r => rs.on('end', r));
       process.stdout.write(os.EOL);
       return;
     }
     const rl = readline.createInterface({ input: fs.createReadStream(file, { encoding: 'utf8' }) });
     let i = 0;
     for await (const line of rl) {
       console.log(line);
       i++;
       if (i >= linesLimit) break;
     }
   }
   
   async function cmdAppend(file, opts) {
     await ensureDirFor(file);
     const content = opts.content || '';
     await fsp.appendFile(file, content, 'utf8');
     console.log('Appended to', file);
   }
   
   async function cmdDelete(p) {
     try {
       const st = await fsp.stat(p);
       if (st.isDirectory()) await fsp.rmdir(p, { recursive: true });
       else await fsp.unlink(p);
       console.log('Deleted', p);
     } catch (e) { console.error('Delete failed:', e.message); }
   }
   
   async function cmdCopy(src, dest) {
     await ensureDirFor(dest);
     const stat = await fsp.stat(src);
     const total = stat.size || 0;
     let transferred = 0;
     const rs = fs.createReadStream(src);
     const ws = fs.createWriteStream(dest);
     rs.on('data', chunk => { transferred += chunk.length; const pct = total ? ((transferred/total)*100).toFixed(2) : ''; process.stdout.write(`\rCopying... ${pct}%`); });
     await pump(rs, ws);
     process.stdout.write('\n');
     console.log('Copied', src, '→', dest);
   }
   
   async function cmdMove(src, dest) {
     await ensureDirFor(dest);
     await fsp.rename(src, dest);
     console.log('Moved', src, '→', dest);
   }
   async function cmdgrep(dir, words ){
    const files = await fsp.readdir(dir);
    for(const file of files){
        const fullpath = path.join (dir, file);
        const stat = await fsp.stat
        (fullpath);
        if(stat.isDirectory()){
            await cmdgrep(fullpath, words);
        } else {
            const content = await fsp.readFile(fullpath, 'utf8');
            if(content.includes(words)){
                console.log(`Found in file: ${fullpath}`);
            }
        }
    }
   }
   
   async function cmdList(dir, opts) {
     const out = [];
     async function walk(d) {
       const names = await fsp.readdir(d);
       for (const n of names) {
         const full = path.join(d, n);
         const st = await fsp.stat(full);
         out.push({ path: full, isDir: st.isDirectory(), size: st.size });
         if (st.isDirectory() && opts.recursive) await walk(full);
       }
     }
     await walk(dir || '.');
     out.forEach(i => console.log(i.isDir ? 'd' : '-', i.path, i.isDir ? '' : `${i.size} bytes`));
   }
   
   async function cmdStat(p) {
     const st = await fsp.stat(p);
     console.log(st);
   }
   
   async function cmdFind(dir, opts) {
     const pattern = opts.pattern ? new RegExp(opts.pattern) : null;
     async function walk(d) {
       const names = await fsp.readdir(d);
       for (const n of names) {
         const full = path.join(d, n);
         const st = await fsp.stat(full);
         if (st.isDirectory()) {
           if (opts.recursive) await walk(full);
         } else {
           if (!pattern || pattern.test(n)) console.log(full);
         }
       }
     }
     await walk(dir || '.');
   }
   
   async function cmdReplace(file, opts) {
     if (!fs.existsSync(file)) { console.error('Not found:', file); return; }
     const from = opts.from || '';
     const to = opts.to || '';
     const data = await fsp.readFile(file, 'utf8');
     const updated = data.split(from).join(to);
     await fsp.writeFile(file, updated, 'utf8');
     console.log('Replaced text in', file);
   }
   
   async function cmdHash(file, opts) {
     const algo = opts.algo || 'sha256';
     if (!fs.existsSync(file)) { console.error('Not found:', file); return; }
     const hash = crypto.createHash(algo);
     await pump(fs.createReadStream(file), hash);
     const digest = hash.digest('hex');
     console.log(`${algo} ${digest}`);
   }
   
   async function handle(argv) {
     const args = parseArgs(argv);
     const cmd = args._[0] || 'interactive';
     try {
       switch (cmd) {
         case 'help': help(); break;
         case 'create': await cmdCreate(args._[1], args); break;
         case 'read': await cmdRead(args._[1], args); break;
         case 'append': await cmdAppend(args._[1], args); break;
         case 'delete': await cmdDelete(args._[1]); break;
         case 'copy': await cmdCopy(args._[1], args._[2]); break;
         case 'move': await cmdMove(args._[1], args._[2]); break;
         case 'list': await cmdList(args._[1] || '.', args); break;
         case 'stat': await cmdStat(args._[1]); break;
         case 'find': await cmdFind(args._[1] || '.', args); break;
         case 'replace': await cmdReplace(args._[1], args); break;
         case 'hash': await cmdHash(args._[1], args); break;
         case 'interactive':
           await interactive();
           break;
         default:
           console.error('Unknown command:', cmd); help();
       }
     } catch (e) { console.error('Error:', e && e.message ? e.message : e); }
   }
   
   async function interactive() {
     const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'fm> ' });
     console.log('Advanced File Manager — interactive mode. Type "help" for commands. Ctrl+C to exit.');
     rl.prompt();
     for await (const line of rl) {
       const trimmed = line.trim();
       if (!trimmed) { rl.prompt(); continue; }
       if (trimmed === 'exit' || trimmed === 'quit') { rl.close(); break; }
       if (trimmed === 'help') { help(); rl.prompt(); continue; }
       const parts = trimmed.split(/\s+/);
       await handle(parts);
       rl.prompt();
     }
   }
   
   if (require.main === module) {
     const argv = process.argv.slice(2);
     if (argv.length === 0) handle([]);
     else handle(argv);
   }
   
   module.exports = { parseArgs };
   


