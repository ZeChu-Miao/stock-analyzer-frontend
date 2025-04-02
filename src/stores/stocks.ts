import { defineStore } from 'pinia';
import axios from 'axios';

// 根据环境获取API基础URL
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888';

interface StockData {
  代码: string;
  名称: string;
  最新价: number;
  涨跌幅: number;
  总市值: number;
  换手率: number;
  量比: number;
  [key: string]: any;
}

interface FilterParams {
  market_cap_limit: number;
  volume_ratio: number;
  turnover_rate: number;
  board_types: string;
}

export const useStocksStore = defineStore('stocks', {
  state: () => ({
    stocks: [] as StockData[],
    loading: false,
    error: null as string | null,
    total: 0,
    timestamp: '',
    filterParams: {
      market_cap_limit: 100,
      volume_ratio: 2,
      turnover_rate: 10,
      board_types: 'main'
    } as FilterParams
  }),
  
  actions: {
    async fetchFilteredStocks(params?: Partial<FilterParams>) {
      this.loading = true;
      this.error = null;
      
      try {
        // 合并默认参数和传入的参数
        const queryParams = { ...this.filterParams, ...params };
        this.filterParams = queryParams;
        
        // 使用环境变量中的API基础URL
        const response = await axios.get(`${apiBaseUrl}/api/stocks/filter`, { 
          params: queryParams 
        });
        
        const result = response.data;
        
        this.stocks = result.data;
        this.total = result.total;
        this.timestamp = result.timestamp;
        
        return result;
      } catch (error: any) {
        this.error = error.message || '获取股票数据失败';
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});