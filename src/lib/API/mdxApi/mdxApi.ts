export default async function createMdxFile(folderName: string, fileName: string, content: string) {
    try {
      const response = await fetch('/api/makeMdxFile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderName, fileName, content }),
      });
  
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error creating MDX file:', error);
    }
  }
  
  