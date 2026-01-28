import { useState, useEffect, useCallback } from 'react';

export interface WeightRecord {
  date: string;
  weight: number;
}

const STORAGE_KEY = 'cat-weight-tracker-data';

// 预填充的历史数据
const INITIAL_DATA: WeightRecord[] = [
  { date: '2025-12-25', weight: 4.6 },
  { date: '2026-01-01', weight: 4.6 },
  { date: '2026-01-06', weight: 4.9 },
  { date: '2026-01-09', weight: 4.8 },
  { date: '2026-01-11', weight: 4.9 },
  { date: '2026-01-14', weight: 4.7 },
  { date: '2026-01-16', weight: 4.8 },
  { date: '2026-01-18', weight: 4.7 },
  { date: '2026-01-20', weight: 4.7 },
  { date: '2026-01-23', weight: 4.6 },
  { date: '2026-01-25', weight: 4.7 },
  { date: '2026-01-26', weight: 4.7 },
  { date: '2026-01-28', weight: 4.8 },
];

export function useWeightData() {
  const [records, setRecords] = useState<WeightRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 从 localStorage 加载数据
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRecords(parsed);
      } catch {
        setRecords(INITIAL_DATA);
      }
    } else {
      // 首次使用，填充初始数据
      setRecords(INITIAL_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    }
    setIsLoaded(true);
  }, []);

  // 保存到 localStorage
  const saveRecords = useCallback((newRecords: WeightRecord[]) => {
    // 按日期排序
    const sorted = [...newRecords].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setRecords(sorted);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
  }, []);

  // 添加新记录
  const addRecord = useCallback((weight: number, date?: string) => {
    const recordDate = date || new Date().toISOString().split('T')[0];
    
    // 检查是否已存在相同日期的记录
    const existingIndex = records.findIndex(r => r.date === recordDate);
    
    if (existingIndex >= 0) {
      // 更新现有记录
      const updated = [...records];
      updated[existingIndex] = { date: recordDate, weight };
      saveRecords(updated);
    } else {
      // 添加新记录
      saveRecords([...records, { date: recordDate, weight }]);
    }
  }, [records, saveRecords]);

  // 删除记录
  const deleteRecord = useCallback((date: string) => {
    saveRecords(records.filter(r => r.date !== date));
  }, [records, saveRecords]);

  // 清空所有数据
  const clearAllRecords = useCallback(() => {
    setRecords([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 导出为 CSV
  const exportToCSV = useCallback(() => {
    const header = 'Date,Weight (kg)\n';
    const rows = records.map(r => `${r.date},${r.weight}`).join('\n');
    const csv = header + rows;
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `cat-weight-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [records]);

  // 计算统计数据
  const stats = {
    current: records.length > 0 ? records[records.length - 1].weight : null,
    average: records.length > 0 
      ? Number((records.reduce((sum, r) => sum + r.weight, 0) / records.length).toFixed(2))
      : null,
    max: records.length > 0 ? Math.max(...records.map(r => r.weight)) : null,
    min: records.length > 0 ? Math.min(...records.map(r => r.weight)) : null,
    change: records.length >= 2 
      ? Number((records[records.length - 1].weight - records[records.length - 2].weight).toFixed(2))
      : null,
    total: records.length,
  };

  return {
    records,
    stats,
    isLoaded,
    addRecord,
    deleteRecord,
    clearAllRecords,
    exportToCSV,
  };
}
