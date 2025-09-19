from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from utils.rand_num_gen import pseudo_rand_num, to_test_generator

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

x = []

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/pseudo_rand_num")
async def calc_rand_num(n:int):
    global x
    x, period = pseudo_rand_num(n)
    return {
        'sequence': "".join(str(x_i) for x_i in x),
        'period': period
    }

@app.get("/pseudo_rand_num/test")
async def rand_num_test():
    global x
    prob,prob_act,pi_est,pi_act = to_test_generator(x)
    return {
        "probability" : prob,
        "actualProbability" : prob_act,
        "PIestimate" : pi_est,
        "PIactual" : pi_act
    }
