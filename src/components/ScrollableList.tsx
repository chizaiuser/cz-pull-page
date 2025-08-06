import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

// 定义组件Props类型
interface ScrollableListProps {
  /** 初始数据列表 */
  initialData: any[];
  /** 加载更多数据的函数 */
  loadMore: () => Promise<any[]>;
  /** 刷新数据的函数 */
  refresh: () => Promise<any[]>;
  /** 渲染列表项的函数 */
  renderItem: (item: any, index: number) => React.ReactNode;
  /** 列表项的唯一key */
  keyExtractor: (item: any, index: number) => string;
  /** 列表容器的样式 */
  containerStyle?: React.CSSProperties;
  /** 列表项的样式 */
  itemStyle?: React.CSSProperties;
}

const ScrollableList: React.FC<ScrollableListProps> = ({
  initialData,
  loadMore,
  refresh,
  renderItem,
  keyExtractor,
  containerStyle = {},
  itemStyle = {},
}) => {
  // 状态管理
  const [data, setData] = useState<any[]>(initialData);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshProgress, setRefreshProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 引用
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // 初始加载
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // 检测底部元素是否可见，如果可见且有更多数据，则加载更多
  useEffect(() => {
    if (inView && hasMore && !isLoadingMore && !isRefreshing) {
      handleLoadMore();
    }
  }, [inView, hasMore, isLoadingMore, isRefreshing]);

  // 处理下拉刷新
  const handleRefresh = async () => {
    if (isRefreshing || isLoadingMore) return;

    setIsRefreshing(true);
    try {
      const newData = await refresh();
      setData(newData);
      setHasMore(true); // 重置hasMore状态
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
      setRefreshProgress(0);
      setIsDragging(false);
    }
  };

  // 处理加载更多
  const handleLoadMore = async () => {
    if (isLoadingMore || isRefreshing || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const newData = await loadMore();
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData(prevData => [...prevData, ...newData]);
      }
    } catch (error) {
      console.error('Load more failed:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // 处理触摸开始事件
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isRefreshing || isLoadingMore) return;
    // 记录触摸开始的位置
    // 这里简化处理，实际应用中需要记录初始位置
  };

  // 处理触摸移动事件
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isRefreshing || isLoadingMore || !isDragging) return;
    // 计算触摸移动的距离
    // 更新refreshProgress
  };

  // 处理触摸结束事件
  const handleTouchEnd = () => {
    if (isRefreshing || isLoadingMore) return;
    // 如果下拉距离足够，触发刷新
    if (refreshProgress > 50) {
      handleRefresh();
    } else {
      setRefreshProgress(0);
      setIsDragging(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'auto',
        height: '100%',
        position: 'relative',
        ...containerStyle,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 下拉刷新指示器 */}
      {isDragging && (
        <div
          style={{
            height: `${refreshProgress}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'height 0.3s ease',
          }}
        >
          <span>{isRefreshing ? '刷新中...' : '下拉刷新'}</span>
        </div>
      )}

      {/* 列表内容 */}
      <div style={{ padding: '10px 0' }}>
        {data.map((item, index) => (
          <div key={keyExtractor(item, index)} style={itemStyle}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* 加载更多指示器 */}
      {isLoadingMore && (
        <div
          style={{
            padding: '15px',
            textAlign: 'center',
          }}
        >
          <span>加载中...</span>
        </div>
      )}

      {/* 底部哨兵元素，用于检测是否滚动到底部 */}
      <div ref={ref} style={{ height: '10px' }} />

      {/* 没有更多数据提示 */}
      {!hasMore && !isLoadingMore && (
        <div
          style={{
            padding: '15px',
            textAlign: 'center',
            color: '#999',
          }}
        >
          没有更多数据了
        </div>
      )}
    </div>
  );
};

export default ScrollableList;