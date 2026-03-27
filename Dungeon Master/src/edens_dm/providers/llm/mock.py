from __future__ import annotations

from edens_dm.providers.base import LlmProvider, NarrationRequest, NarrationResponse


class TemplateChroniclerProvider(LlmProvider):
    async def narrate(self, request: NarrationRequest) -> NarrationResponse:
        lines = [f"<voice:{request.voice_tag}>", request.state_summary.strip()]
        if request.narration_hints:
            lines.append(" ".join(request.narration_hints[:2]))
        if request.follow_up_question:
            lines.append(request.follow_up_question)
        return NarrationResponse(text=" ".join(lines), voice_tag=request.voice_tag)

