"use client";
import { ReactNode, useMemo } from "react";
import { RoomProvider } from "../../../../../../../../liveblocks.config";
import { useSearchParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import { Loading } from "../../../../../../../components/TextEditor/loading";

export function Room({ roomId, children }: { roomId: string, children: ReactNode }) {
  const exampleRoomId = useExampleRoomId(roomId);

  return (
    <RoomProvider
      id={exampleRoomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense  fallback={<Loading />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

function useExampleRoomId(roomId: string) {
  console.log("roomId",roomId)
  const params = useSearchParams();
  const exampleId = params?.get("exampleId");
console.log("exampleId",exampleId);

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId;
  }, [roomId, exampleId]);

  console.log("exampleRoomId",exampleRoomId)

  return exampleRoomId;
}
