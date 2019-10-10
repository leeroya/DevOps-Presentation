FROM mcr.microsoft.com/windows/nanoserver:1809
RUN curl.exe -o node.zip https://nodejs.org/dist/v9.2.0/node-v9.2.0-win-x64.zip && \
  mkdir C:\node && \
  tar.exe -xf node.zip -C C:\node --strip-components=1
ENV PATH C:\node:%PATH%


#Start Node
CMD [ "node.exe" ]
