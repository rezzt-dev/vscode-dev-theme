-- muestra de haskell para revisar el resaltado de dark dev
{-# LANGUAGE ScopedTypeVariables #-}
module DarkDev.Theme (Slot(..), alpha) where

import qualified Data.Map.Strict as Map
import Data.Maybe (fromMaybe)

data Mode = Dark | Mono deriving (Show, Eq)

data Slot = Slot { name :: String, value :: Int }

class HasAlpha a where
  alpha :: a -> Double -> String

instance HasAlpha Slot where
  alpha (Slot n v) percent = n ++ ": " ++ show (round (percent / 100 * 255) + v)

{- devuelve el primero -}
first :: forall a. [a] -> Maybe a
first []      = Nothing
first (x : _) = Just x

main :: IO ()
main = do
  let slots = Map.fromList [("ink", 1), ("on", 2)]
      total = sum . map (* 2) $ Map.elems slots
  if total > 3 then putStrLn "grande" else putStrLn "pequeño"
  print $ fromMaybe 0 (Map.lookup "ink" slots)
