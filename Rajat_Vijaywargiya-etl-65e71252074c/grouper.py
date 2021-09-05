import pandas as pd
import os
import csv

os.chdir("C:\\Users\\Rajat\\Downloads\\archive")
df = pd.read_csv("FinalDataSubset.csv",usecols=["Srno","TranslatedRecipeName","Cuisine","Image_URL","Price"],index_col="Srno")

groups = df.groupby('Cuisine')

for name,group in groups:
    with open("C:\\Users\\Rajat\\Downloads\\archive\\CSV\\"+str(name)+'.csv','w') as out:
        csv_out=csv.writer(out)
        group.to_csv(out)
        
