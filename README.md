# Background

`Minimax` algorithm is a popular decision rule in artificial intelligence and game theory, where possible loss for a worst-case scenario would be **minimized**. In contrast, the rule will try to **_maximin_** — to maximize the minimum gain.

<p align="center">
<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/76d2fe8fe2fc328093c7b0c19e83a0197004a5d3">
</p>

## Pseudocode

**Without** `alpha-beta prune`, a typical Minimax algorithm may look like this:

```
function minimax(node, depth, maximizingPlayer) is
    if depth = 0 or node is a terminal node then
        return the heuristic value of node
    if maximizingPlayer then
        value := −∞
        for each child of node do
            value := max(value, minimax(child, depth − 1, FALSE))
        return value
    else (* minimizing player *)
        value := +∞
        for each child of node do
            value := min(value, minimax(child, depth − 1, TRUE))
        return value
```