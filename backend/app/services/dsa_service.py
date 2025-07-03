# DSA Service: Trie, PriorityQueue, Graph

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    def insert(self, word):
        word = word.lower()  # Store in lowercase
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    def autocomplete(self, prefix):
        prefix = prefix.lower()  # Search in lowercase
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
    def push(self, item):
        import heapq
        heapq.heappush(self.heap, item)
    def pop(self):
        import heapq
        if self.heap:
            return heapq.heappop(self.heap)
        return None
    def peek(self):
        if self.heap:
            return self.heap[0]
        return None

class Graph:
    def __init__(self):
        self.adj = {}
    def add_edge(self, u, v):
        if u not in self.adj:
            self.adj[u] = []
        self.adj[u].append(v)
    def get_neighbors(self, u):
        return self.adj.get(u, []) 