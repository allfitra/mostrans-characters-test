import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home";
import CharacterDetail from "../pages/home/detail";
import CharactersByLocation from "../pages/location";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="/location" element={<CharactersByLocation />} />
    </Routes>
  );
};
