import type { Investment } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async getAllInvestments(): Promise<Investment[]> {
    return this.request<Investment[]>("/api/investments");
  }

  async getInvestment(id: string): Promise<Investment> {
    return this.request<Investment>(`/api/investments/${id}`);
  }

  async createInvestment(investment: Investment): Promise<Investment> {
    return this.request<Investment>("/api/investments", {
      method: "POST",
      body: JSON.stringify(investment),
    });
  }

  async updateInvestment(
    id: string,
    investment: Investment
  ): Promise<Investment> {
    return this.request<Investment>(`/api/investments/${id}`, {
      method: "PUT",
      body: JSON.stringify(investment),
    });
  }

  async deleteInvestment(id: string): Promise<Investment> {
    return this.request<Investment>(`/api/investments/${id}`, {
      method: "DELETE",
    });
  }

  async checkHealth(): Promise<{ status: string }> {
    return this.request<{ status: string }>("/health");
  }
}

export const apiService = new ApiService(API_BASE_URL);
