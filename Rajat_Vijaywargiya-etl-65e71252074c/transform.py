import pandas as pd
import os
os.chdir("C:\\Users\\Rajat\\Downloads\\archive")
def apply(val):
    banlist = ["fish","chicken","egg","prawn","gosht","beef","keema","mutton","tempura","murgh","steak","stew","omelette","broth","pork"]
    for x in banlist:
        if x in str(val).lower():
            return False
    return True

df = pd.read_csv("IndianFoodDatasetCSV.csv",usecols=["TranslatedRecipeName","Cuisine"])

index_items = df[(df['TranslatedRecipeName'].map(apply)) == False].index
df.drop(index_items,inplace=True)
df = df.replace(to_replace = r"-.*",value="",regex=True)
df = df.replace(to_replace = r"\(.*",value="",regex=True)
df = df.replace(to_replace = r"\sRecipes",value="",regex=True)
df = df.replace(to_replace = r"\srecipe",value="",regex=True)
df = df.replace(to_replace = r"\sRecipe",value="",regex=True)
df = df.replace(to_replace = r"﻿",value="",regex=True)
df['TranslatedRecipeName'] = df['TranslatedRecipeName'].str.strip()
df = df.drop_duplicates(subset=['TranslatedRecipeName'], keep='first')
df.to_csv("LastFoodDataSet.csv")