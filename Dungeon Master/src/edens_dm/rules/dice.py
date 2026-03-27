from __future__ import annotations

import random
import re
from collections import deque

from edens_dm.rules.types import RuleRoll

ROLL_RE = re.compile(r"^(?P<count>\d+)d(?P<sides>\d+)(?:(?P<op>[+x*×-])(?P<value>\d+))?$")


class DeterministicRng:
    def __init__(self, seed: int | None = None, scripted_rolls: list[int] | None = None) -> None:
        self._random = random.Random(seed)
        self._scripted = deque(scripted_rolls or [])

    def randint(self, low: int, high: int) -> int:
        if self._scripted:
            value = self._scripted.popleft()
            if value < low or value > high:
                raise ValueError(f"Scripted roll {value} outside range {low}-{high}")
            return value
        return self._random.randint(low, high)

    def roll(self, count: int, sides: int, label: str) -> RuleRoll:
        rolls = [self.randint(1, sides) for _ in range(count)]
        return RuleRoll(label=label, expression=f"{count}d{sides}", total=sum(rolls), rolls=rolls)

    def roll_expression(self, expression: str, label: str) -> RuleRoll:
        normalized = expression.strip().lower().replace(" ", "")
        if normalized.isdigit():
            total = int(normalized)
            return RuleRoll(label=label, expression=normalized, total=total, rolls=[total])
        match = ROLL_RE.match(normalized)
        if not match:
            raise ValueError(f"Ukendt rul-udtryk: {expression}")
        count = int(match.group("count"))
        sides = int(match.group("sides"))
        op = match.group("op")
        value = int(match.group("value") or 0)
        base = self.roll(count, sides, label)
        total = base.total
        if op in {"+", "-"}:
            total = total + value if op == "+" else total - value
        elif op in {"x", "*", "×"}:
            total *= value
        return RuleRoll(label=label, expression=normalized, total=total, rolls=base.rolls)
