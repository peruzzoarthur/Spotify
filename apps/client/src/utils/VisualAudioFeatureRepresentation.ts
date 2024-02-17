type normalizingMethodsTypes = "default" | "0/100" | "loudness";

export const getAudioFeatureFontSize = (
  value: number,
  normalizingMethod: normalizingMethodsTypes
) => {
  if (normalizingMethod === "default") {
    if (value >= 0.8) {
      return "2.5rem";
    } else if (value >= 0.6) {
      return "2rem";
    } else if (value >= 0.4) {
      return "1.5rem";
    } else if (value >= 0.2) {
      return "1rem";
    } else {
      return "1rem";
    }
  } else if (normalizingMethod === "0/100") {
    if (value >= 80) {
      return "2.5rem";
    } else if (value >= 60) {
      return "2rem";
    } else if (value >= 40) {
      return "1.5rem";
    } else if (value >= 20) {
      return "1rem";
    } else {
      return "1rem";
    }
  } else if (normalizingMethod === "loudness") {
    if (value >= 0) {
      return "2.5rem";
    } else if (value >= -15) {
      return "2rem";
    } else if (value >= -30) {
      return "1.5rem";
    } else if (value >= -45) {
      return "1rem";
    } else {
      return "1rem";
    }
  }
};
