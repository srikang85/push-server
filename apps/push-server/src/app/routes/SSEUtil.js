export function setSSEHeader(res) {
    res.writeHead(200, {
       'Content-Type': 'text/event-stream',
       'Cache-Control': 'no-cache',
       'Connection': 'keep-alive'
    });
}