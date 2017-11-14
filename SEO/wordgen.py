from random import randint

words = "nano reflex ventricle swahili patent easter peninsula thorium law cholelithiasis"
extras = "An intellectual freezes underneath the potential! A varied exhaust accepts. An offensive garble rules underneath the stark havoc. The receipt explodes inside the mounted doe. A jack bests this incorporate consent."
extras_2 = "A changing nerve trips opposite the mathematics. A predictable leak strays within the forgotten fake. The wife wises a hand. The smoked decade previews the skin. The conflicting infant withdraws within the arbitrary wind. Will the bowl rant below the unpredictable charm?"
extras_3 = "How will the floppy keep a thin resource? An anagram primes the astronomy. The scratch road objects with the uninteresting economics. The liquid marches? How does a receipt quit a frustrate doubt? Below the query sings an eternal worth."
extra_4 = "The tome essays a bush underneath a preceding money. A club conforms? The charge gutters the bit python without each cassette. The crowd stays the home. Does a downstairs fiddle rave after the transformation? The fuel pumps near the accompanied repertoire."

all_words = words + ' ' + extras_2 + ' ' + words + ' ' + extra_4 + ' ' + words
all_words = all_words.replace('.', '').replace('!', '').replace('?', '').split(' ')

final_sentence = ''
counter = len(all_words) - 1
for i in range(0, len(all_words)):
	index = randint(0, counter)

	final_sentence += all_words[index] + ' '
	del all_words[index]
	counter -= 1

print final_sentence
