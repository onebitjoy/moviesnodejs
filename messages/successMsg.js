export const successMsg = (data) => {
  return {
    status: "success",
    length: data.length,
    data: data
  }
}