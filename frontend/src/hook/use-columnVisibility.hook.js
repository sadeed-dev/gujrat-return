// hooks/useColumnVisibility.js
"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function useColumnVisibility(columns, tableId) {
  const { watch, setValue, control, getValues, ...rest } = useForm({
    defaultValues: {
      visibility: columns.reduce((acc, col) => {
        acc[col.field] = true;
        return acc;
      }, {}),
    },
  });

  const visibility = watch("visibility");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`column-visibility-${tableId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setValue("visibility", parsed);
      } catch (e) {
        console.warn("Failed to parse column visibility", e);
      }
    }
  }, [tableId, setValue]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(`column-visibility-${tableId}`, JSON.stringify(visibility));
  }, [visibility, tableId]);

  // Add this function:
  const toggleField = (field) => {
    const newVisibility = { ...visibility, [field]: !visibility[field] };
    setValue(`visibility.${field}`, !visibility[field]);
    localStorage.setItem(`column-visibility-${tableId}`, JSON.stringify(newVisibility));
  };

  return {
    visibility,
    setValue,
    control,
    getValues,
    toggleField, // <-- export this
    ...rest,
  };
}