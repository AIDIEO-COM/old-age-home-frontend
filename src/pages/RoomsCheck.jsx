import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RoomCheck = () => {
  const [roomNo, setRoomNo] = useState('13');
  const [selections, setSelections] = useState({});

  const inspectionItems = [
    { name: 'Hot Water Sink Temperature', type: 'temperature', defaultValue: '27 Degree' },
    { name: 'Hot Water Flash', type: 'toggle' },
    { name: 'Cold Water Flash', type: 'toggle' },
    { name: 'Window restrictor in place and in working order', type: 'toggle' },
    { name: 'Are the light in working order?', type: 'toggle' },
    { name: 'Nurse call system satisfactory', type: 'yesno' },
    { name: 'Is the door guard in good working order?', type: 'toggle' },
    { name: 'Is the wardrobe fixed to the wall', type: 'yesno' },
    { name: 'Has the bed rails been checked', type: 'yesno', defaultValue: 'Yes, Satisfying' }
  ];

  useEffect(() => {
    const initialSelections = {};
    inspectionItems.forEach((item, index) => {
      if (item.type === 'toggle' || item.type === 'yesno') {
        initialSelections[index] = Math.random() < 0.5 ? 'yes' : 'no';
      }
    });
    setSelections(initialSelections);
  }, []);

  const handleSelect = (index, value) => {
    setSelections(prev => ({ ...prev, [index]: value }));
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <div className=" space-y-2">
          <Label htmlFor="roomNo">Room No</Label>
          <Input 
            id="roomNo"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            className="w-24"
          />
        </div>
      </div>

      <div className="space-y-6">
        {inspectionItems.map((item, index) => (
          <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-4">
              <Label>{item.name}</Label>
            </div>

            <div className="lg:col-span-4">
              {item.type === 'temperature' ? (
                <Input defaultValue={item.defaultValue} className="w-full" />
              ) : (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSelect(index, 'yes')}
                    className={selections[index] === 'yes' ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}
                  >
                    {item.type === 'yesno' ? (item.defaultValue || 'Yes') : 'Working'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSelect(index, 'no')}
                    className={selections[index] === 'no' ? 'bg-red-100 text-red-700 hover:bg-red-200' : ''}
                  >
                    {item.type === 'yesno' ? 'No' : 'Need Repair'}
                  </Button>
                </div>
              )}
            </div>

            <div className="lg:col-span-3">
              <Input placeholder="Comment" className="w-full" />
            </div>

            {/* <div className="md:col-span-1 flex justify-center">
              <Button size="icon" variant="outline" className="h-8 w-8">
                <span className="text-xs">i</span>
              </Button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCheck;
