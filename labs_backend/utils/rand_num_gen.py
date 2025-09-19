from math import pi, sqrt

def pseudo_rand_num(n:int):
    m = 2 ** 21 - 1
    a = 8 ** 3
    c = 144
    x_0 = 3
    period = 0

    x = []

    for i in range(n):
        x.append(x_0)
        x_0 = (a*x_0 + c) % m
        if (not period) and (x_0 in x):
            period = len(x)

    return x,period

def euclide(a,b):
    if a<b:
        a,b = b,a
    while True:
        r = a%b
        if r<=0:
            return b
        a = b
        b = r

def to_test_generator(arr):
    count_one = 0
    count_all = 0
    for i in range(0,len(arr)-1, 2):
        count_all+=1
        if euclide(arr[i+1],arr[i])==1:
            count_one+=1

    prob = count_one/count_all
    pi_est = sqrt(6 / prob)
    prob_act = 6/(pi**2)

    return prob,prob_act,pi_est,pi
