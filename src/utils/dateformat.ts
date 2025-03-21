module.exports = (timestamp: string | number | Date): string => new Date(timestamp).toLocaleString();
