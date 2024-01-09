from surprise import Dataset, Reader, SVD, KNNBasic
from surprise.model_selection import train_test_split
from surprise import accuracy

import pymongo
import pandas as pd

client = pymongo.MongoClient("mongodb://your-mongodb-connection-string")
db = client.your_database_name

cursor = db.your_collection_name.find({}, {'_id': 0})
data = pd.DataFrame(list(cursor))

reader = Reader(rating_scale=(1, 5))

dataset = Dataset.load_from_df(data, reader)

trainset, testset = train_test_split(dataset, test_size=0.2, random_state=42)

model = KNNBasic(sim_options={'user_based': True})
model.fit(trainset)

predictions = model.test(testset)
accuracy.rmse(predictions)

user_id = 'user1'

unrated_items = dataset.build_anti_testset().build_full_trainset().build_anti_testset().ur[user_id]

predicted_ratings = [(item, model.predict(user_id, item).est) for item in unrated_items]

predicted_ratings.sort(key=lambda x: x[1], reverse=True)

top_n = 5
top_recommendations = predicted_ratings[:top_n]
print(f"\nTop {top_n} Recommended Cars for {user_id}:")
for item, rating in top_recommendations:
    print(f"Car: {item}, Predicted Rating: {rating}")