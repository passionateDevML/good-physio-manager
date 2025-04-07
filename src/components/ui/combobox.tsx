
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
  const [searchQuery, setSearchQuery] = React.useState("")
  
  // Create a safe options array
  const safeOptions = React.useMemo(() => {
    return Array.isArray(options) ? options.filter(option => 
      option && typeof option === 'object' && 'id' in option && 'name' in option
    ) : [];
  }, [options]);
  
  // Find the selected option
  const selectedOption = safeOptions.find((option) => option.id === value);
  
  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return safeOptions;
    return safeOptions.filter((option) => 
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [safeOptions, searchQuery]);

  // Handle the search input change
  const handleSearchChange = (inputValue: string) => {
    setSearchQuery(inputValue);
  };

  // Handle selection
  const handleSelect = (selectedValue: string) => {
    // Find the option with the matching name
    const option = safeOptions.find((opt) => opt.name === selectedValue);
    if (option) {
      onChange(option.id);
      setOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          onClick={() => setOpen(!open)}
        >
          {selectedOption?.name || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Rechercher..." 
            value={searchQuery}
            onValueChange={handleSearchChange}
          />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option.id}
                value={option.name}
                onSelect={handleSelect}
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
        </Command>
      </PopoverContent>
    </Popover>
  );
}
