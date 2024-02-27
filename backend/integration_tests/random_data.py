from random import choice

NAMES = ["Daan", "Noah", "Lucas", "Sem", "Levi", "Finn", "Milan", "Luuk", "Bram", "Liam", "Jesse", "Mees", "Thomas", "Sam", "Max", "Thijs", "Julian", "Lars", "Adam", "Benjamin", "Noud", "Luca", "Ruben", "Jayden", "James", "Tim", "Stijn", "Gijs", "Siem", "Teun", "Mats", "Hugo", "Jan", "Boaz", "Sven", "Jens", "Mason", "David", "Olivier", "Dex", "Vince", "Guus", "Floris", "Tijn", "Jack", "Ryan", "Cas", "Tygo", "Ties", "Joep", "Daniël", "Tom", "Jurre", "Willem", "Pepijn", "Roan", "Fedde", "Pim", "Jason", "Tobias", "Dean", "Xavi", "Mohamed", "Senn", "Owen", "Quinn", "Morris", "Dani", "Mohammed", "Abel", "Nathan", "Samuel", "Hidde", "Alexander", "Rayan", "Mick", "Niek", "Stan", "Dylan", "Aiden", "Johannes", "Thijmen", "Joshua", "Pieter", "Boris", "Casper", "Jace", "Kai", "Job", "Koen", "Joris", "Jelle", "Sepp", "Jasper", "Jax", "Bas", "Simon", "Jip", "Stef", "Kyan","Emma", "Julia", "Sophie", "Tess", "Mila", "Anna", "Zoë", "Sara", "Eva", "Lotte", "Evi", "Saar", "Nora", "Lieke", "Lynn", "Fenna", "Olivia", "Fleur", "Liv", "Noor", "Isa", "Yara", "Sarah", "Lisa", "Maud", "Roos", "Nina", "Milou", "Noa", "Elin", "Lauren", "Nova", "Sofie", "Loïs", "Emily", "Esmee", "Sanne", "Lina", "Amy", "Jasmijn", "Hannah", "Feline", "Ella", "Luna", "Femke", "Anne", "Julie", "Sofia", "Maria", "Sophia", "Naomi", "Liz", "Vera", "Fien", "Isabella", "Elise", "Lara", "Lena", "Bo", "Mia", "Charlotte", "Amber", "Floor", "Lizzy", "Norah", "Jill", "Hailey", "Suze", "Fenne", "Iris", "Eline", "Isabel", "Elena", "Veerle", "Benthe", "Tessa", "Evy", "Ivy", "Rosa", "Puck", "Cato", "Fay", "Linde", "Lize", "Lana", "Rosalie", "Hanna", "Laura", "Elif", "Lola", "Merel", "Nikki", "Kiki", "Fiene", "Livia", "Lily", "Johanna", "Romy", "Suus", "Amira"]
MAIL_DOMAINS = [
    '{}.{}'.format(item, tld)
    for item in ['mail', 'post', 'email', 'mailbox', 'postbox']
    for tld in ['com', 'net', 'org', 'de', 'uk', 'us']
]

def generate_surname():
    parts = {
        'v': ['a', 'o', 'i', 'e'],
        'c': ['n', 'm', 'r', 'l', 'd', 't', 's', 'v'],
        'b': ['st', 'nt', 'ss', 'ng', 'tr', 'ch', 'll', 'nd', 'th', 'sh', 'bl', 'nc', 'pr']
    }
    result = ''
    pattern = 'vcvbv'
    for i, c in enumerate(pattern):
        if i == 0:
            result += choice(parts[c]).upper()
        else:
            result += choice(parts[c])
    return result