# Data preprocessing 

# Importing the dataset
library(tidyverse)
dataset = read.csv('Salary_Data.csv')
# dataset = dataset[, 2:3]

# Splitting the dataset into training set and test set
# install.packages('caTools')
library(caTools)
set.seed(123)
split = sample.split(dataset$Salary, SplitRatio = 2/3)
training_set = subset(dataset, split == TRUE)
test_set = subset(dataset, split == FALSE)

# Feature scalling
# training_Set[, 2:3] = scale(training_Set[, 2:3])
# test_set[, 2:3] = scale(test_set[, 2:3])

# Fitting simple linear regression to the training set
regressor = lm(formula = Salary ~ YearsExperience,
               data = training_set)

# Predicting the test set results
y_pre = predict(regressor, newdata = test_set)

# Visualizing the training set results
training = ggplot() +
  geom_point(aes(x = training_set$YearsExperience, y = training_set$Salary),
             color = 'red') +
  geom_line(aes(x = training_set$YearsExperience, y = predict(regressor, newdata = training_set)),
            color = 'blue') +
  ggtitle('Salary vs Experience (Training set)') + 
  xlab('Years of Experience') +
  ylab('Salary')

# Visualizing the test set results
testing = ggplot() +
  geom_point(aes(x = test_set$YearsExperience, y = test_set$Salary),
             color = 'red') +
  geom_line(aes(x = training_set$YearsExperience, y = predict(regressor, newdata = training_set)),
            color = 'blue') +
  ggtitle('Salary vs Experience (Test set)') + 
  xlab('Years of Experience') +
  ylab('Salary')

library(rmarkdown)
render("report.Rmd")
