export function IsNotNullOrWhiteSpace(str: string){
  return (str !== null && str !== undefined && str.trim() !== "")
}