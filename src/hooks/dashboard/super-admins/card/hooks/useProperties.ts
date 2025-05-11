import { useState, useEffect } from "react";
import { Properties } from "../../properties/properties/types/properties";

export function useProperties(properties: Properties[]) {
  const [filteredProperties, setFilteredProperties] = useState<Properties[]>(
    []
  );
  const [propertyId, setPropertyId] = useState<string>("all");

  useEffect(() => {
    if (propertyId === "all") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((prop) => prop.slug === propertyId)
      );
    }
  }, [propertyId, properties]);

  return {
    filteredProperties,
    propertyId,
    setPropertyId,
  };
}
