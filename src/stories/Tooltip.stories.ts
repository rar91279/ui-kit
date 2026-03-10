import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';

/**
 * Tooltips provide helpful information on hover.
 */
const meta = {
  title: 'Components/Tooltip',
  render: (args) => html`
    <div style="padding: 50px; display: flex; justify-content: center;">
      <span data-tooltip="${args.tooltipText}">${args.content}</span>
    </div>
  `,
  argTypes: {
    tooltipText: { control: 'text' },
    content: { control: 'text' },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    tooltipText: 'Lorem ipsum',
    content: 'Hover over me to see the tooltip',
  },
};

export const LongText: Story = {
  args: {
    tooltipText: 'This is a much longer tooltip text to test wrapping or length.',
    content: 'Check out this longer tooltip',
  },
};

export const FallbackBottom: Story = {
  render: (args) => html`
    <div style="padding: 10px; display: flex; justify-content: center;">
      <span data-tooltip="${args.tooltipText}">${args.content}</span>
    </div>
  `,
  args: {
    tooltipText: 'This tooltip should appear at the bottom because there is no space at the top.',
    content: 'Hover me (Top of viewport)',
  },
};

export const FallbackRight: Story = {
  render: (args) => html`
    <div style="padding: 100px 10px; display: flex; justify-content: flex-start;">
      <span data-tooltip="${args.tooltipText}">${args.content}</span>
    </div>
  `,
  args: {
    tooltipText: 'Tooltip on the right',
    content: 'Hover me (Left side)',
  },
};

export const Scoping: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; flex-direction: column; gap: 50px; align-items: center;">
      <span data-tooltip="First Tooltip (Top Left)" data-tooltip-position="top left">
        Hover for Top Left
      </span>
      <span data-tooltip="Second Tooltip (Bottom Right)" data-tooltip-position="bottom right">
        Hover for Bottom Right
      </span>
    </div>
  `,
};
