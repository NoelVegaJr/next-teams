import * as React from "react";
import { LineChart } from "@/components/Dashboard/LineChart";
import { usePusherEvent } from "hooks/pusher/pushMessage-hook";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/Dashboard/ProgressBar";

interface IDisk {
  letter: string;
  size: number;
  free: number;
  used: number;
  percentage: number;
}

const Servers: React.FunctionComponent = () => {
  const [disks, setDisks] = useState<IDisk[]>([]);
  const [memory, setMemory] = useState<
    {
      data: number;
      time: number;
    }[]
  >([]);
  const [cpu, setCpu] = useState<
    {
      data: number;
      time: number;
    }[]
  >([]);

  const diskQueue = usePusherEvent<{
    data: IDisk[];
    time: number;
    type: string;
  }>({
    clientId: "99e512a0e34c2dc7612d",
    cluster: "us2",
    transport: "ajax",
    endpoint: "http://localhost:3000/api/pusher/auth",
    profileId: "",
    subscription: "stats",
    event: "message",
  });

  const queue = usePusherEvent<{
    data: { cpu: number; memory: number };
    time: number;
    type: string;
  }>({
    clientId: "99e512a0e34c2dc7612d",
    cluster: "us2",
    transport: "ajax",
    endpoint: "http://localhost:3000/api/pusher/auth",
    profileId: "",
    subscription: "stats",
    event: "message",
  });

  useEffect(() => {
    const msg = diskQueue.pop();
    if (msg) {
      if (msg.type === "drive_space") {
        setDisks(msg.data);
      }
    }
  }, [diskQueue]);

  useEffect(() => {
    const msg = queue.pop();

    if (msg?.type === "stats") {
      const cpu = { data: msg.data.cpu, time: +msg.time };
      const memory = { data: msg.data.memory, time: +msg.time };

      setCpu((prev) => [...prev, cpu]);
      setMemory((prev) => [...prev, memory]);
    }
  }, [queue]);

  return (
    <div className="h-screen w-full p-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col justify-evenly gap-6">
        <div className=" flex w-full justify-between gap-4">
          <div className="w-1/2">
            <div>
              <p>CPU: {cpu[cpu.length - 1]?.data ?? 0} %</p>
            </div>
            <LineChart
              data={cpu}
              className="h-44 w-full overflow-hidden rounded border"
            />
          </div>
          <div className="w-1/2">
            <div>
              <p>Memory: {memory[memory.length - 1]?.data ?? 0} %</p>
            </div>
            <LineChart
              gridColor="text-purple-200"
              lineColor="stroke-purple-500"
              areaColor="fill-purple-200"
              data={memory}
              className="h-44 w-full overflow-hidden rounded border"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          {disks.map((disk) => {
            return (
              <div key={disk.letter}>
                <p className="font-semibole">{disk.letter}</p>
                <p>
                  {disk.used} GB / {disk.size} GB
                </p>
                <ProgressBar percentage={disk.percentage} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Servers;
