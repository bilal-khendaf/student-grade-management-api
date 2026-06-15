import path from 'path';

export const printImage = async (req, res) => {
  const { fileName } = req.params;
  const uploadsDir = path.resolve('uploads');
  res.sendFile(path.join(uploadsDir, fileName));
};
