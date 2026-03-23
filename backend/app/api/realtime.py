from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info("WebSocket Client Connected")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info("WebSocket Client Disconnected")

    async def broadcast_order_update(self, message: str):
        """Streams real-time messages to all active frontend clients."""
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/ws/orders/{user_id}")
async def order_websocket(websocket: WebSocket, user_id: str):
    """
    WebSocket endpoint strictly for real-time order tracking logic.
    Provides instant shipping/tracking updates bridging Supabase Realtime to Next.js.
    """
    await manager.connect(websocket)
    try:
        while True:
            # Awaiting standard heartbeats or incoming text instructions
            data = await websocket.receive_text()
            await websocket.send_text(f"Realtime Sync Received: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
