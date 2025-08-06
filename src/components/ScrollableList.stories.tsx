import type { Meta, StoryObj } from '@storybook/react';
import ScrollableList from './ScrollableList';

const meta = {
  title: 'Components/ScrollableList',
  component: ScrollableList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollableList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialData: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    loadMore: () => Promise.resolve([]),
    refresh: () => Promise.resolve(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']),
    renderItem: (item: string) => <div>{item}</div>,
    keyExtractor: (item: string, index: number) => `${item}-${index}`,
  },
};