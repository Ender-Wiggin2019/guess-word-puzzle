import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export function GameRules() {
  return (
    <div className="space-y-4 text-ink-medium leading-relaxed">
      <p>
        这是一个<span className="text-ink-dark font-medium">猜词游戏</span>
        ，玩家的目标是尽可能猜出隐藏的中心字。
      </p>
      <p>
        在<span className="text-ink-dark font-medium">简单模式</span>
        中，会提供另外4个与中心字可以组成二字词汇的辅助单字，可以通过这些辅助字推理出中心字。
      </p>
      <p>
        在<span className="text-ink-dark font-medium">中等模式</span>
        中，你会获得一个已知的辅助字，以及另外几行关联字。每一行的关联字可以与这一行的辅助字组成一个二字短语，你需要先猜出辅助字，才可以找到中心字。
      </p>
      <p>
        在<span className="text-ink-dark font-medium">困难模式</span>
        中，你只能看到关联辅助字。
      </p>
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-start justify-center gap-2">
          <div className="flex-1 text-center text-sm text-ink-light">关联辅助字</div>
          <div className="w-4" />
          <div className="flex-1 text-center text-sm text-ink-light">辅助字</div>
          <div className="w-4" />
          <div className="flex-1 text-center text-sm text-ink-light">中心字</div>
        </div>
        <div className="flex items-stretch justify-center gap-2 mt-2">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="flex gap-1">
              <span className="w-7 h-7 flex items-center justify-center border border-ink/30 rounded bg-paper">猜</span>
              <span className="w-7 h-7 flex items-center justify-center border border-ink/30 rounded bg-paper">字</span>
            </div>
            <div className="flex gap-1">
              <span className="w-7 h-7 flex items-center justify-center border border-ink/30 rounded bg-paper">文</span>
              <span className="w-7 h-7 flex items-center justify-center border border-ink/30 rounded bg-paper">器</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-4">
            <div className="h-7 flex items-center">
              <FontAwesomeIcon icon={faArrowRight} className="text-ink-light" />
            </div>
            <div className="h-7 flex items-center">
              <FontAwesomeIcon icon={faArrowRight} className="text-ink-light" />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <span className="w-7 h-7 flex items-center justify-center border border-cyan rounded bg-paper text-cyan">谜</span>
            <span className="w-7 h-7 flex items-center justify-center border border-cyan rounded bg-paper text-cyan">具</span>
          </div>
          <div className="w-4 self-stretch flex items-center">
            <FontAwesomeIcon icon={faArrowRight} className="text-ink-light" />
          </div>
          <div className="flex-1 flex items-center justify-center" style={{ minHeight: '64px' }}>
            <span className="w-7 h-7 flex items-center justify-center border border-green rounded bg-paper text-green">面</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-ink-light mt-4">
        注意，辅助字和中心字都不一定唯一，如果发现不对可能需要换一换思路。
      </p>
    </div>
  );
}
