import pandas as pd
import numpy as np
import os

os.chdir("C:\\Users\\Rajat\\Downloads\\archive")
df = pd.read_csv("LastFoodDataSetx.csv",usecols=["TranslatedRecipeName","Cuisine","Image_URL"])
df2 = df.head(150)
df2['TranslatedRecipeName'] = df2['TranslatedRecipeName'].str.title()
df2.loc[:,'Price'] = np.random.randint(100, 400, df2.shape[0])
df2.to_csv('FinalDataSubset.csv')