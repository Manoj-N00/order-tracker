export const fetchSummaryData = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/summary`);
    if (!response.ok) {
      throw new Error("Failed to fetch summary data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching summary data:", error);
    throw error;
  }
};
