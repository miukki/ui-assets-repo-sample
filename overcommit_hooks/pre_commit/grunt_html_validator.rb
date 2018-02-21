
module Overcommit::Hook::PreCommit
  class GruntHtmlValidator < Base
  	def run
  		result = execute(%w[grunt htmlhintCustom])
  		if result.stdout =~ /Aborted due to warnings/
  			return :fail, result.stdout
  		end
  		:pass
  	end

  end
end