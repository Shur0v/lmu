import axios from 'axios';

const API_BASE_URL = 'http://192.168.4.3:3020';

interface EventData {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  timezone?: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  status?: number;
}

const EventApis = {
  createEvent: async (eventData: EventData): Promise<ApiResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/event`, eventData, {
        headers: {
          'Content-Type': 'application/json',
          // Add any authorization headers if needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      // If the request was successful (status 200-299)
      if (response.status >= 200 && response.status < 300) {
        return {
          success: true,
          data: response.data,
          status: response.status,
          message: 'Event created successfully'
        };
      }

      return {
        success: false,
        status: response.status,
        message: response.data?.message || 'Failed to create event'
      };

    } catch (error: any) {
      console.error('Error creating event:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create event',
        status: error.response?.status || 500
      };
    }
  },

  getAllEvents: async (params?: { page?: number; limit?: number }): Promise<ApiResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/event`, {
        params: params,
        headers: {
          'Content-Type': 'application/json',
          // Add authorization if needed
        }
      });

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          status: response.status
        };
      }

      return {
        success: false,
        status: response.status,
        message: 'Failed to fetch events'
      };

    } catch (error: any) {
      console.error('Error fetching events:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch events',
        status: error.response?.status || 500
      };
    }
  }
};

export default EventApis; 