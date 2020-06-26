208.实现Trie(前缀树)：
实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作

示例：
```
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");     // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");   
trie.search("app");     // 返回 true

```

```js
/**
 * Initialize your data structure here.
 */
var TrieNode = function() {
    this.next = {}
    this.isEnd = false
}
var Trie = function() {
    this.root = new TrieNode()
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    if (!word) return

    let node = this.root
    for (let i = 0; i < word.length; i++) {
        if (!node.next[word[i]]) {
            node.next[word[i]] = new TrieNode()
        }
        node = node.next[word[i]]
    }
    node.isEnd = true
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    if (!word) return false

    let node = this.root
    for (let i = 0; i < word.length; i++) {
        if (!node.next[word[i]]) {
            return false
        } else {
            node = node.next[word[i]]
        }
    }
    return node.isEnd
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    if (!prefix) return false

    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
        if (!node.next[prefix[i]]) {
            return false
        } else {
            node = node.next[prefix[i]]
        }
    }
    return true
};

```