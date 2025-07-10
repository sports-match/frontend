// directives/v-tooltip.ts
import type { DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip z-50 absolute px-2 py-1 text-sm rounded bg-black text-white whitespace-nowrap pointer-events-none opacity-0 transition-opacity duration-200';
    tooltip.textContent = binding.value;
    if (tooltip.textContent) {
      document.body.appendChild(tooltip);

      const updateTooltip = (e: MouseEvent) => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.style.opacity = '1';
      };

      el.addEventListener('mouseenter', updateTooltip);
      el.addEventListener('mousemove', updateTooltip);
      el.addEventListener('mouseleave', () => (tooltip.style.opacity = '0'));

      // Store references for cleanup
      (el as any)._tooltip = { tooltip, updateTooltip };
    }
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    const tooltipEl = (el as any)._tooltip?.tooltip;
    if (tooltipEl) {
      tooltipEl.textContent = binding.value;
    }
  },

  unmounted(el: HTMLElement) {
    const { tooltip, updateTooltip } = (el as any)._tooltip || {};
    if (tooltip) {
      tooltip.remove();
    }
    el.removeEventListener('mouseenter', updateTooltip);
    el.removeEventListener('mousemove', updateTooltip);
    el.removeEventListener('mouseleave', updateTooltip);
  },
};
