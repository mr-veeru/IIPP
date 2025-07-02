# DSA Service: Trie, PriorityQueue, Graph

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    def autocomplete(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        results = []
        self._dfs(node, prefix, results)
        return results
    def _dfs(self, node, prefix, results):
        if node.is_end:
            results.append(prefix)
        for char, child in node.children.items():
            self._dfs(child, prefix + char, results)

class PriorityQueue:
    def __init__(self):
        self.heap = []
    # TODO: Implement push, pop, peek

class Graph:
    def __init__(self):
        self.adj = {}
    # TODO: Implement add_edge, get_neighbors 