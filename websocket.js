/*

// creating a binary tree
class Node{
    constructor(x){   
        this.data=x;
        this.left =  null;  left of the node 
        this.right = null; right of the node 

    }
}
    

let firstnode  = new Node(10);
let secodenode = new Node(20);
let thirdnode  = new Node(30);
let fourthnode  = new Node(40);




firstnode.left = secodenode;
firstnode.right = thirdnode;
secodenode.left = fourthnode;*/




/*class Node{
    constructor(x){
        this.data =x;
        this.left  = null;
        this.right  = null;

    }
}

function keyexist(root , key){
    if(root==null){
        return false;

    }
    if(root.data==key){
        return true;

    }


    let res1 = keyexist(root.left, key);

    // node found, no need to look further
    if (res1) return true;

    // node is not found in left,
    // so recur on right subtree
    let res2 = keyexist(root.right, key);

    //node found 
    if(res2) return true ;


    return res2;
}



let key  = 99;


let root = new Node(0);
root.left = new Node(1);
root.left.left = new Node(3);
root.left.left.left = new Node(7);
root.left.right = new Node(4);
root.left.right.left= new Node(8);
root.left.right.right = new Node(9);
root.right  = new Node(2);
root.right.left = new Node(5);
root.right.right= new Node(6)


if (keyexist(root, key))
    console.log("True");
else
    console.log("False");

// Binary tree
//          0
//        /  \
//       1    2
//      / \   / \
//     3   4 5   6
//    /   / \
//   7   8   9 */







/*class Node {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
    }
}

function levelOrderRec(root, level, res) {
    // Base case
    if (root === null) return;

    // Add a new level to the result if needed
    if (res.length <= level)
        res.push([]);

    // Add current node's data to its corresponding level
    res[level].push(root.data);

    // Recur for left and right children
    levelOrderRec(root.left, level + 1, res);
    levelOrderRec(root.right, level + 1, res);
}

// Function to perform level order traversal
function levelOrder(root) {
    // Stores the result level by level
    const res = [];

    levelOrderRec(root, 0, res);
    return res;
}

// Driver Code
    //      5
    //     / \
    //   12   13
    //   /  \    \
    //  7    14   2
    // / \  /  \  / \
    //17 23 27 3 8  11

const root = new Node(5);
root.left = new Node(12);
root.right = new Node(13);

root.left.left = new Node(7);
root.left.right = new Node(14);

root.right.right = new Node(2);

root.left.left.left = new Node(17);
root.left.left.right = new Node(23);

root.left.right.left = new Node(27);
root.left.right.right = new Node(3);

root.right.right.left = new Node(8);
root.right.right.right = new Node(11);

const res = levelOrder(root);
for (const level of res) {
    console.log(level.join(' '));
} */




// JavaScript program to insert element 
// (in level order) in Binary Tree

/*class Node {
    constructor(x) {
        this.data = x;
        this.left = null;
        this.right = null;
    }
}

// Function to insert element in binary tree
function InsertNode(root, data) {

    // If the tree is empty, assign new
    // node address to root
    if (root == null) {
        root = new Node(data);
        return root;
    }

    // Else, do level order traversal until we find an empty
    // place, i.e. either left child or right child of some
    // node is pointing to NULL.
    let q = [];
    q.push(root);

    while (q.length > 0) {
    
        let curr = q.shift();

        // First check left if left is null 
        // insert node in left otherwise check for right
        if (curr.left !== null)
            q.push(curr.left);
        else {
            curr.left = new Node(data);
            return root;
        }

        if (curr.right !== null)
            q.push(curr.right);
        else {
            curr.right = new Node(data);
            return root;
        }
    }
}

// Inorder traversal of a binary tree
function inorder(curr) {
    if (curr == null) return;
    inorder(curr.left);
    process.stdout.write(curr.data + ' ');
    inorder(curr.right);
}

// Constructing the binary tree
//          10
//        /    \ 
//       11     9
//      /      / \
//     7      15   8
let root = new Node(10);
root.left = new Node(11);
root.right = new Node(9);
root.left.left = new Node(7);
root.right.left = new Node(15);
root.right.right = new Node(8);

let key = 12;
root = InsertNode(root, key);

// After insertion 12 in binary tree
//          10
//        /    \ 
//       11     9
//      /  \   / \
//     7   12 15  8

inorder(root); */



// JavaScript program to delete a specific 
// element in a binary tree

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Function to delete the deepest node in 
// a binary tree
function deleteDeepest(root, dNode) {
    let queue = [];
    queue.push(root);

    while (queue.length !== 0) {
        let curr = queue.shift();

        // If current node is the deepest
        // node, delete it
        if (curr === dNode) {
            curr = null;
            return;
        }

        // Check the right child first
        if (curr.right) {
            if (curr.right === dNode) {
                // checking for that if cur node is deepest node if yes then make it null
                curr.right = null;
                return;
            } else {
                queue.push(curr.right);
            }
        }

        // Check the left child
        if (curr.left) {
            if (curr.left === dNode) {
             // checking for that if cur node is deepest node in right if yes then make it null
                curr.left = null;
                return;
            } else {
                queue.push(curr.left);
            }
        }
    }
}


// Function to delete the node with the given key
function deletion(root, key) {

    if (root === null) return null;

    // If the tree has only one node
    if (root.left === null && root.right === null) {
        if (root.data === key) return null;
        else return root;
    }

    let queue = [];
    queue.push(root);

    let keyNode = null;
    let curr = null;

    // Level order traversal to find the 
    // deepest node and the key node
    while (queue.length !== 0) {
        curr = queue.shift();

        // If current node is the key node
        if (curr.data === key) keyNode = curr;

        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
    }

    // If the key node is found, replace its data
    // with the deepest node's data
    if (keyNode !== null) {
    
    	// Store the deepest node's data
        let x = curr.data;
        
        // Replace the key node's data with the
        // deepest node's data
        keyNode.data = x;
        
         // Delete the deepest node
        deleteDeepest(root, curr);
    }

    return root;
}

// Inorder traversal of a binary tree
function inorder(curr) {
    if (curr === null) return;
    inorder(curr.left);
    console.log(curr.data + " ");
    inorder(curr.right);
}

// Construct the binary tree
let root = new Node(10);
root.left = new Node(11);
root.right = new Node(9);
root.left.left = new Node(7);
root.left.right = new Node(12);
root.right.left = new Node(15);
root.right.right = new Node(8);

let key = 11;
root = deletion(root, key);
inorder(root);



// creating a tree;

