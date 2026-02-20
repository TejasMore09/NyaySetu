interface UploadBoxProps {
  onResult: (data: any) => void;
  onLoading: (state: boolean) => void;
  onError: (msg: string) => void;
}

export default function UploadBox({
  onResult,
  onLoading,
  onError,
}: UploadBoxProps) {

  async function handleUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      onLoading(true);
      onError("");

      const res = await fetch(
        "http://127.0.0.1:8000/api/analyze/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      onResult(data);
    } catch {
      onError("Failed to analyze file. Check backend.");
    } finally {
      onLoading(false);
    }
  }

  return (
    <input
      type="file"
      accept=".pdf"
      onChange={handleUpload}
    />
  );
}
