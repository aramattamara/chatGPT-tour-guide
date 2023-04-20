import os
import openai
from flask import Flask, redirect, render_template, request, jsonify

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


# Define the route for the index page
@app.route("/")
def index():
    return render_template("index.html")


# Define the route for the API endpoint
@app.route("/api", methods=["POST"])
def api():
    city = request.json["city"]
    season = request.json["season"]
    numDays = request.json["numDays"]
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=generate_prompt(city, season, numDays),
        temperature=0.5,
        max_tokens=1000,
    )

    return jsonify({"result": response.choices[0].text})


# Define function to create prompt
def generate_prompt(city, season, numDays):
    prompt = f"Write tour for {numDays} in {city} in {season}"
    return prompt


if __name__ == '__main__':
    app.run(debug=True)
