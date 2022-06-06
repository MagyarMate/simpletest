FROM mongo
COPY users.json /users.json
COPY results.json /results.json
COPY questions.json /questions.json
COPY import.sh /import.sh
RUN chmod +x /import.sh
CMD ["/import.sh"]