/**
 * 节点类
 */
class Node {
  val = "";
  left = "";
  right = "";
  constructor(val = null, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
};

function defaultCompareFn(a, b) {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

/**
 * 二叉搜索树，左节点比父节点小，右节点比父节点大。
 */
class BinarySearchTree {
  root = null;
  constructor(compareFn = defaultCompareFn) {
    this.compareFn = compareFn;
  }

  insert(value) {
    if (this.root == null) {
      this.root = new Node(value);
    } else {
      this.insertNode(this.root, value);
    }
  }

  insertNode(node, value) {
    if (this.compareFn(value, node.val) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node(value);
      } else {
        this.insertNode(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = new Node(value);
      } else {
        this.insertNode(node.right, value);
      }
    }
  }

  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (!node) {
      return false;
    } else {
      let compare = this.compareFn(value, node.val);
      if (compare === Compare.LESS_THAN) {
        return this.searchNode(node.left, value);
      } else if (compare === Compare.BIGGER_THAN) {
        return this.searchNode(node.right, value);
      } else {
        return true;
      }
    }
  }

  min() {
    return this.minNode(this.root);
  }

  /**
   * 查找最小值，也就是最左边的叶子节点
   * @param {*} node
   * @returns
   */
  minNode(node) {
    let current = node;
    while (current && current.left) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    let current = node;
    while (current && current.right) {
      current = current.right;
    }
    return current;
  }

  remove(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(node, value) {
    if (!node) {
      return null;
    }
    let compare = this.compareFn(value, node.val);
    if (compare === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (compare === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // 找到了需要删除节点
      // 左右都为空，叶子节点直接设为null
      if (!node.left && !node.right) {
        node = null;
        return node;
      }
      // 左右之一为空，直接设置为另一边
      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.left) {
        node = node.right;
        return node;
      }
      // 左右节点都有，从右子树中找出最小的节点替换删除的节点
      let aux = this.minNode(node.right);
      node.val = aux.val;
      node.right = this.removeNode(node.right, aux.val);
      return node;
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  /**
   * 中序遍历 左中右 用于对树节点进行排序
   * @param {*} node
   * @param {*} callback
   */
  inOrderTraverseNode(node, callback) {
    if (node) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.val);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  /**
   * 前序遍历 中左右
   * @param {*} node
   * @param {*} callback
   */
  preOrderTraverseNode(node, callback) {
    if (node) {
      callback(node.val);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  /**
   * 后序遍历 左右中 用于计算目录和子目录的所有文件占空间的大小
   * @param {*} node
   * @param {*} callback
   */
  postOrderTraverseNode(node, callback) {
    if (node) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.val);
    }
  }
  /**
   * 计算节点的高度，它是到任意子节点的边的最大值。
   */
  getNodeHeight(node) {
    if (!node) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }
}

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

/**
 * Adelson-Velskii-Landi(AVL树) 自平衡二叉搜索树，任意一个节点左右两侧子树的高度差最多为1
 */
class AVLTree extends BinarySearchTree {
  root = null;
  constructor(compareFn = defaultCompareFn) {
    this.compareFn = compareFn;
  }

  /**
   * 在AVL树中，左右子树高度差必须是0,-1,1三个值之一，如果不是则需要平衡。
   */
  getBalanceFactor() {
    const heightDiff =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDiff) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  /**
   * 左-左 LL：向右的单旋转
   * @param {*} node
   */
  rotationLL(node) {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }

  /**
   * 右-右 RR：向左的单旋转
   * @param {*} node
   * @returns
   */
  rotationRR(node) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (!node) {
      return new Node(value);
    } else if (this.compareFn(value, node.val) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, value);
    } else if (this.compareFn(value, node.val) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node; //重复
    }

    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(value, node.left.val) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(value, node.right.val) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        node = this.rotationRL(node);
      }
    }
    return node;
  }
}

// const tree = new BinarySearchTree();
// tree.insert(11);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);

// tree.insert(6);

// const printNode = (val) => console.log(val);

// tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);
// tree.postOrderTraverse(printNode);

// console.log(tree.search(11) ? "Value 11 found" : "Value 11 not found");
// tree.remove(11);
// console.log(tree.search(11) ? "Value 11 found" : "Value 11 not found");
// tree.insert(11);

// console.log(tree.search(1) ? "Value 1 found" : "Value 1 not found");

// /**
//  * @param {TreeNode} root
//  * @param {number} targetSum
//  * @return {boolean}
//  */
// var hasPathSum = function (root, targetSum) {
//   if (!root) {
//     return;
//   }

//   let result = false;

//   function dfs(root, sum = 0) {
//     if (sum === targetSum) {
//       result = true;
//       return;
//     }
//     if (root) {
//       dfs(root.left, sum + root.val);
//       dfs(root.right, sum + root.val);
//     }
//   }

//   dfs(root, 0);

//   return result;
// };

// let root = new TreeNode(5),
//   targetSum = 22;

// let l1 = new TreeNode(4),
//   l2 = new TreeNode(11, new TreeNode(7), new TreeNode(2));

// root.left = l1;
// l1.left = l2;

// console.log(hasPathSum(root, targetSum));
