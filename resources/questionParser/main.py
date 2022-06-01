# Imports
import json
import dataclasses
from typing import List

from lxml import etree


# Definitions
@dataclasses.dataclass
class Question:
    number: int
    question: str
    answer_a: str
    answer_b: str
    answer_c: str
    answer_d: str
    correct: int
    omit: bool = False


class EnhancedJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        return super().default(o)


# Code
if __name__ == '__main__':
    question_list: List[Question] = list()
    with open('pj_test_questions.html', 'r', encoding='UTF-8') as file:
        tree = etree.HTML(file.read())
        for child in tree.xpath('//*[@id=\"l2\"]/li'):
            try:
                question_number = child.attrib['data-list-text'].strip('.')
                question = child[0].text
                answer_a = ''
                answer_b = ''
                answer_c = ''
                answer_d = ''
                correct = 0
                for answer in child[1]:
                    letter = answer.attrib['data-list-text']
                    if answer.findall('.//span'):
                        solution = answer[0][0].text
                        correct = ord(letter[0]) - 64
                    else:
                        solution = answer[0].text

                    if 'A' in letter:
                        answer_a = solution
                    elif 'B' in letter:
                        answer_b = solution
                    elif 'C' in letter:
                        answer_c = solution
                    elif 'D' in letter:
                        answer_d = solution

                question_list.append(
                    Question(question_number, question, answer_a, answer_b, answer_c, answer_d, correct,
                             omit=correct == 0))
            except:
                pass

    with open('question_database_dump.json', 'w', encoding='UTF-8') as json_file:
        json.dump(question_list, json_file, cls=EnhancedJSONEncoder, ensure_ascii=False)
