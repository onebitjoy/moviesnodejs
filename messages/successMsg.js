export const successMsg = (data) => {

  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    return {
      status: "success",
      data: data
    }
  }

  if (Array.isArray(data) && data?.length !== 0) {
    return {
      status: "success",
      length: data.length,
      data: data
    }
  }

  return {
    status: "error",
    data: "No data found for your query"
  }

}