## Made By Anurag Das

## ABSTRACT
Social media sentiment analysis for Sustainable Development Goal 17 – Partnerships for the Goals 
stands at the intersection of computational linguistics, machine learning, and global social awareness. 
In an era where platforms like Twitter and Reddit amplify the collective consciousness of people 
and nations, understanding emotional tone, attitude, and opinion dynamics across diverse online 
discussions becomes vital for measuring the spirit of cooperation and progress toward sustainable 
partnerships. 
This project, titled “Voices for Partnership: Social Media Analytics for Strengthening Global 
Collaboration,” aims to construct an intelligent sentiment analysis framework that captures and 
interprets the global conversation surrounding collaboration, unity, and partnership initiatives. It 
bridges multiple linguistic, cultural, and contextual nuances by leveraging recent advances in Natural 
Language Processing (NLP) and machine learning-driven sentiment classification. 
A unified dataset is curated from Twitter and Reddit platforms, each contributing distinct discourse 
styles — concise, high-velocity tweets and context-rich Reddit discussions. The preprocessing 
pipeline includes text cleaning, stopword removal, lemmatization, and sentiment normalization, 
ensuring uniformity and linguistic balance across platforms. Cleaned textual data is then vectorized 
using TF-IDF representations to preserve semantic relationships and emotional cues while 
minimizing noise from informal language and abbreviations. 
Multiple machine learning classifiers are implemented and rigorously compared — including the 
Support Vector Machine (SVM), Decision Tree (DT), and Naïve Bayes (NB) algorithms. Among 
these, the SVM model demonstrates the highest performance, achieving an accuracy of 93%, 
significantly outperforming Decision Tree (78%) and Naïve Bayes (70%) baselines. The SVM’s 
ability to capture subtle linguistic polarity and contextual sentiment shifts makes it ideal for 
classifying the multifaceted emotional expressions found in social media dialogue. 
Comprehensive performance evaluation employs standard metrics such as accuracy, precision, 
recall, and F1-score, complemented by visual analytics including confusion matrices and sentiment 
distribution graphs. The final sentiment analysis framework demonstrates robust accuracy and 
adaptability across platforms, effectively identifying positive, negative, and neutral sentiments 
within real-world, user-generated content. 
Beyond quantitative performance, the system offers qualitative insights into how global citizens 
express collaboration, criticism, and hope in the context of international partnership and 
development. By transforming unstructured digital conversation into measurable sentiment 
intelligence, this work contributes a meaningful analytical tool for policymakers, NGOs, and 
researchers monitoring the progress of SDG 17. 
Ultimately, this project transcends raw computation — it listens. It listens to the voices that rise in 
unison for partnership, charting the emotional pulse of global cooperation through data, algorithms, 
and empathy woven into code.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
