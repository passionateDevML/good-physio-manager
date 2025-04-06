
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  options: { id: string; name: string }[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  emptyMessage?: string
  className?: string
}

export function Combobox({
  options = [],
  value,
  onChange,
  placeholder,
  emptyMessage = "No results found.",
  className
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  
  // Create a safe options array, ensuring we never provide undefined elements
  const safeOptions = React.useMemo(() => {
    if (!Array.isArray(options)) {
      return [];
    }
    // Filter out anything that's not a valid option object
    return options.filter(option => 
      option !== null && 
      option !== undefined && 
      typeof option === 'object' &&
      'id' in option &&
      'name' in option
    );
  }, [options]);
  
  // Find the selected option (safely)
  const selectedOption = safeOptions.find((option) => option.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption?.name || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          {safeOptions.length > 0 && (
            <CommandGroup>
              {safeOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
