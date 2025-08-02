"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"

export function AppDatePicker({
  date,
  setDate,
  placeholder = "Pick a date",
}: {
  date: Date | null;
  setDate: (date: Date | null) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 space-y-2" align="start">
        <Calendar
          mode="single"
                    selected={date !== null ? date : undefined}
                    onSelect={(day) => day !== undefined && setDate(day)}
          initialFocus
        />
        {date && (
          <Button
            variant="ghost"
            className="w-full text-red-500 hover:bg-red-100"
            onClick={() => setDate(null)}
          >
            <X className="mr-2 h-4 w-4" />
            Clear Date
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
